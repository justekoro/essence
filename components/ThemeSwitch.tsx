import React, { HtmlHTMLAttributes } from "react";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils";

const ThemeSwitch = ({ className, ...props }: HtmlHTMLAttributes<HTMLElement>) => {
  // states
  const { setTheme, theme } = useTheme();
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      <Sun />
      <Switch checked={theme === "light" ? false : true} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
      <Moon />
    </div>
  );
};

export default ThemeSwitch;
