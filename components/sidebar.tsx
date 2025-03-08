"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Home, Settings, User, Download, Bookmark, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const links = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Rooms",
      href: "/rooms",
      icon: Home,
    },
    {
      name: "Bookmark",
      href: "/bookmark",
      icon: Bookmark,
    },
    {
      name: "Downloaded",
      href: "/downloaded",
      icon: Download,
    },
    {
      name: "Support",
      href: "/support",
      icon: HelpCircle,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="flex h-screen w-16 md:w-64 flex-col bg-app-card border-r border-gray-800/50">
      <div className="flex h-16 items-center border-b border-gray-800/50 px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-app-blue">
            <span className="text-primary-foreground font-bold">H</span>
          </div>
          <span className="hidden md:inline-block font-bold text-xl">Housepam</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-gray-100",
                pathname === link.href ? "bg-gray-800/50 text-gray-100" : "",
              )}
            >
              <link.icon className="h-5 w-5" />
              <span className="hidden md:inline-block">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Link
          href="/profile"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-400 transition-all hover:text-gray-100 mb-2",
            pathname === "/profile" ? "bg-gray-800/50 text-gray-100" : "",
          )}
        >
          <User className="h-5 w-5" />
          <span className="hidden md:inline-block">Profile</span>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-gray-100 px-3"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-0 md:mr-2" />
          <span className="hidden md:inline-block">Logout</span>
        </Button>
      </div>
    </div>
  )
}

