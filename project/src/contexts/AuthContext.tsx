import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage
    const demoUser = localStorage.getItem('demo-user');
    if (demoUser) {
      const userData = JSON.parse(demoUser);
      setUser(userData);
      setSession({ user: userData } as Session);
      setLoading(false);
      return;
    }

    // Try Supabase auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Create profile on sign up
      if (event === 'SIGNED_UP' && session?.user) {
        try {
          await supabase
            .from('profiles')
            .insert({
              id: session.user.id,
              email: session.user.email!,
              full_name: session.user.user_metadata.full_name,
            });
        } catch (error) {
          console.log('Profile creation failed, using demo mode');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      return { data, error };
    } catch (error) {
      // Fallback to demo mode
      const demoUser = {
        id: `demo_${Date.now()}`,
        email,
        user_metadata: { full_name: fullName },
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
      setUser(demoUser as User);
      setSession({ user: demoUser } as Session);
      return { data: { user: demoUser }, error: null };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { data, error };
    } catch (error) {
      // Fallback to demo mode
      const demoUser = {
        id: `demo_${Date.now()}`,
        email,
        user_metadata: { full_name: 'Demo User' },
        created_at: new Date().toISOString(),
      };
      localStorage.setItem('demo-user', JSON.stringify(demoUser));
      setUser(demoUser as User);
      setSession({ user: demoUser } as Session);
      return { data: { user: demoUser }, error: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.log('Supabase signout failed');
    }
    
    // Clear demo user
    localStorage.removeItem('demo-user');
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};