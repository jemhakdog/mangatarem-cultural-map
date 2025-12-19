
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Barangay Admin' | 'Public User';
  barangay?: string; // Specific barangay for Barangay Admins
}

const AUTH_KEY = 'mangatarem_user_session';

export const authService = {
  login: async (email: string, password: string): Promise<User> => {
    // Mock network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Static mock check
    if (password.length < 6) throw new Error("Invalid credentials");
    
    // Check if user exists in local storage
    const savedUser = localStorage.getItem(AUTH_KEY);
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email) return parsed;
    }

    // Default mock user if not found in storage
    const user: User = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'Admin' : 'Public User',
      barangay: email.includes('admin') ? 'Poblacion' : undefined
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  register: async (name: string, email: string, password: string, role: User['role'], barangay?: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
      barangay: role === 'Barangay Admin' ? (barangay || 'Poblacion') : undefined
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  },

  getCurrentUser: (): User | null => {
    const session = localStorage.getItem(AUTH_KEY);
    return session ? JSON.parse(session) : null;
  }
};
