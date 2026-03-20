import { Button } from "@/components/ui/button";
import { Award, Badge, LogOut } from "lucide-react";

interface ProfileHeaderProps {
  user: any;
  handleLogout: () => void;
}

export function ProfileHeader({ user, handleLogout }: ProfileHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="h-8 gap-2 px-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-md font-medium text-accent-foreground">
            {user?.full_name?.charAt(0).toUpperCase()}
          </div>
        </Button>
        <div>
          <h1 className="font-serif text-2xl text-foreground">
            {user.full_name}
          </h1>
          <div className="mt-1 flex items-center gap-2">
            <Badge className="bg-gold/10 text-gold hover:bg-gold/20 font-sans text-[10px] uppercase tracking-wider">
              <Award className="mr-1 size-3" />
              Gold Member
            </Badge>
            <span className="font-sans text-xs text-muted-foreground">
              0 points
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="gap-2 font-sans text-xs uppercase tracking-wider"
      >
        <LogOut className="size-3.5" />
        Sign Out
      </Button>
    </div>
  );
}
