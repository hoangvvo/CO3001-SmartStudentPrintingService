import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileText } from "lucide-react";
import { FC } from "react";

const data = [
  {
    user: {
      name: "Hoang Vo",
      email: "hoang.vo@hcmut.edu.vn",
    },
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    user: {
      name: "Nguyen Van A",
      email: "nguyenvana@gmail.com",
    },
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    user: {
      name: "Tran Thi B",
      email: "tranthib@gmail.com",
    },
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    user: {
      name: "Le Van C",
      email: "levanc@gmail.com",
    },
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export const PrintRequestList: FC = () => {
  return (
    <div className="space-y-8">
      {data.map((item) => (
        <div className="flex items-center" key={item.user.email}>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/avatars/01.png" alt="Avatar" />
            <AvatarFallback>{item.user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{item.user.name}</p>
            <p className="text-sm text-muted-foreground">{item.user.email}</p>
          </div>
          <div className="ml-auto font-medium text-secondary-foreground flex items-center gap-2">
            <FileText />
            {item.total}
          </div>
        </div>
      ))}
    </div>
  );
};
