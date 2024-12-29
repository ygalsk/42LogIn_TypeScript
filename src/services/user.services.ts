interface User {
    id: string;
    username: string;
    email?: string;
  }
  
  export class UserService {
    private users: Map<string, User> = new Map();
  
    async findOrCreate(profile: any): Promise<User> {
      let user = this.users.get(profile.id);
      
      if (!user) {
        user = {
          id: profile.id,
          username: profile.username,
          email: profile.emails?.[0]?.value
        };
        this.users.set(profile.id, user);
      }
      
      return user;
    }
  
    async findById(id: string): Promise<User | undefined> {
      return this.users.get(id);
    }
  }