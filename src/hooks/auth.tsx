import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser  } from "../database/models/User";

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SingInCredentials): Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({email, password}: SingInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const { token, user } = response.data;

      api.defaults.headers.Authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        await userCollection.create((newUser)=> {
          newUser.user_id = user.id;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.driver_license = user.driver_license;
          newUser.avatar = user.avatar;
          newUser.token = token;
        });
      });

      setData({ ...user, token });
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();
      if (response.length >= 1) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.Authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
    }

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
