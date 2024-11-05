"use client"

import * as React from "react";
import Link from "next/link";
import { Bell, BarChart2, FileText, Layout, LogOut, Package2, Rocket, Search, Settings, User, Image, Zap, Heart, Palette, Menu, Database, Users, Package, Wrench as Tool, HelpCircle, ChevronDown, ChevronsUpDown, Check, Plus, Command, AudioWaveform } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from "@/components/ui/command";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Sample data for teams
const teamsData = [
	{
		name: "Acme Inc",
		logo: Command,
		plan: "Enterprise",
	},
	{
		name: "Acme Corp.",
		logo: AudioWaveform,
		plan: "Startup",
	},
	{
		name: "Evil Corp.",
		logo: Command,
		plan: "Free",
	},
];

export default function AdminInterface({ children }) {
	const [activeSection, setActiveSection] = React.useState("dashboard");
	const [isCommandPaletteOpen, setIsCommandPaletteOpen] = React.useState(false);
	const [openGroups, setOpenGroups] = React.useState([]);
	const [activeTeam, setActiveTeam] = React.useState(teamsData[0]);

	const toggleGroup = (value) => {
		setOpenGroups((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));
	};

	const sidebarItems = [
		{ icon: <Layout className="w-4 h-4" />, label: "Dashboard", value: "", url: "/admin" },
		{ icon: <FileText className="w-4 h-4" />, label: "Content Management", value: "content", url: "/admin/content" },
		{
			icon: <Palette className="w-4 h-4" />,
			label: "Design & Appearance",
			value: "design",
			subItems: [
				{ label: "Themes", value: "design/themes" },
				{ label: "Templates", value: "design/templates" },
				{ label: "Component Library", value: "design/components" },
				{ label: "Styles", value: "design/styles" },
			],
		},
		{
			icon: <Menu className="w-4 h-4" />,
			label: "Navigation",
			value: "navigation",
			subItems: [{ label: "Menus", value: "navigation/menus" }],
		},
		{
			icon: <Database className="w-4 h-4" />,
			label: "Content Types",
			value: "content-types",
			subItems: [{ label: "Data Modeling", value: "content-types/modeling" }],
		},
		{
			icon: <Search className="w-4 h-4" />,
			label: "SEO & Metadata",
			value: "seo",
			subItems: [
				{ label: "SEO Settings", value: "seo/settings" },
				{ label: "Redirects", value: "seo/redirects" },
			],
		},
		{
			icon: <Users className="w-4 h-4" />,
			label: "Users & Permissions",
			value: "users",
			subItems: [
				{ label: "User Management", value: "users/management" },
				{ label: "Roles & Permissions", value: "users/roles" },
			],
		},
		{
			icon: <Package className="w-4 h-4" />,
			label: "Plugins & Extensions",
			value: "plugins",
			subItems: [
				{ label: "Plugin Manager", value: "plugins/manager" },
				{ label: "Integration Settings", value: "plugins/integrations" },
			],
		},
		{
			icon: <Settings className="w-4 h-4" />,
			label: "Settings",
			value: "settings",
			subItems: [
				{ label: "General", value: "settings/general" },
				{ label: "Media Settings", value: "settings/media" },
				{ label: "Advanced", value: "settings/advanced" },
			],
		},
		{
			icon: <Tool className="w-4 h-4" />,
			label: "Tools",
			value: "tools",
			subItems: [
				{ label: "Backups", value: "tools/backups" },
				{ label: "Deployment", value: "tools/deployment" },
				{ label: "Import/Export", value: "tools/import-export" },
			],
		},
		{
			icon: <BarChart2 className="w-4 h-4" />,
			label: "Analytics & Reports",
			value: "analytics",
			subItems: [
				{ label: "Site Analytics", value: "analytics/site" },
				{ label: "Real-time Monitoring", value: "analytics/realtime" },
			],
		},
		{
			icon: <HelpCircle className="w-4 h-4" />,
			label: "Help & Support",
			value: "help",
			subItems: [
				{ label: "Documentation", value: "help/docs" },
				{ label: "Support", value: "help/support" },
			],
		},
	];

	React.useEffect(() => {
		const handleKeyDown = (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "k") {
				event.preventDefault();
				setIsCommandPaletteOpen(true);
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<SidebarProvider>
			<div className="flex w-full h-screen bg-background">
				<Sidebar collapsible="icon">
					<SidebarHeader>
						<SidebarMenu>
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
											<div className="flex items-center justify-center rounded-lg aspect-square size-8 bg-sidebar-primary text-sidebar-primary-foreground">
												<activeTeam.logo className="size-4" />
											</div>
											<div className="grid flex-1 text-sm leading-tight text-left">
												<span className="font-semibold truncate">{activeTeam.name}</span>
												<span className="text-xs truncate">{activeTeam.plan}</span>
											</div>
											<ChevronsUpDown className="ml-auto" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg" align="start" side="bottom" sideOffset={4}>
										<DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
										{teamsData.map((team, index) => (
											<DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)} className="gap-2 p-2">
												<div className="flex items-center justify-center border rounded-sm size-6">
													<team.logo className="size-4 shrink-0" />
												</div>
												{team.name}
												<DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
											</DropdownMenuItem>
										))}
										<DropdownMenuSeparator />
										<DropdownMenuItem className="gap-2 p-2">
											<div className="flex items-center justify-center border rounded-md size-6 bg-background">
												<Plus className="size-4" />
											</div>
											<div className="font-medium text-muted-foreground">Add team</div>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Platform</SidebarGroupLabel>
							<SidebarMenu>
								{sidebarItems.map((item) => (
									<React.Fragment key={item.value}>
										{item.subItems ? (
											<Collapsible open={openGroups.includes(item.value)} onOpenChange={() => toggleGroup(item.value)}>
												<SidebarMenuItem>
													<CollapsibleTrigger asChild>
														<SidebarMenuButton>
															{item.icon}
															<span className="ml-2">{item.label}</span>
															<ChevronDown className={`ml-auto h-4 w-4 transition-transform duration-200 ${openGroups.includes(item.value) ? "rotate-180" : ""}`} />
														</SidebarMenuButton>
													</CollapsibleTrigger>
													<CollapsibleContent>
														<SidebarMenuSub>
															{item.subItems.map((subItem) => (
																<SidebarMenuSubItem key={subItem.value}>
																	<SidebarMenuSubButton asChild>
																		<Link href={`/admin/${subItem.value}`} onClick={() => setActiveSection(subItem.value)}>
																			<span>{subItem.label}</span>
																		</Link>
																	</SidebarMenuSubButton>
																</SidebarMenuSubItem>
															))}
														</SidebarMenuSub>
													</CollapsibleContent>
												</SidebarMenuItem>
											</Collapsible>
										) : (
											<SidebarMenuItem>
												<SidebarMenuButton asChild>
													<Link href={item.url} onClick={() => setActiveSection(item.value)}>
														{item.icon}
														<span className="ml-2">{item.label}</span>
													</Link>
												</SidebarMenuButton>
											</SidebarMenuItem>
										)}
									</React.Fragment>
								))}
							</SidebarMenu>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SidebarMenu>
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
											<Avatar className="w-8 h-8 rounded-lg">
												<AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
												<AvatarFallback>JD</AvatarFallback>
											</Avatar>
											<div className="grid flex-1 text-sm leading-tight text-left">
												<span className="font-semibold truncate">John Doe</span>
												<span className="text-xs truncate">john@example.com</span>
											</div>
											<ChevronsUpDown className="ml-auto size-4" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<User className="w-4 h-4 mr-2" />
											<span>Profile</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Settings className="w-4 h-4 mr-2" />
											<span>Settings</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<LogOut className="w-4 h-4 mr-2" />
											<span>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
					<SidebarRail />
				</Sidebar>

				<SidebarInset>
					<header className="flex items-center justify-between h-12 px-4 bg-white border-b shrink-0">
						<div className="flex items-center space-x-4">
							<SidebarTrigger />
							<Button variant="outline" size="sm" className="w-48 h-8" onClick={() => setIsCommandPaletteOpen(true)}>
								<Search className="w-3 h-3 mr-2" />
								<span className="text-xs">Search...</span>
								<kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
									<span className="text-xs">⌘</span>K
								</kbd>
							</Button>
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="ghost" size="icon" className="relative w-8 h-8">
								<Bell className="w-4 h-4" />
								<span className="sr-only">Notifications</span>
								<Badge variant="destructive" className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center p-0 text-[10px]">
									3
								</Badge>
							</Button>
							<Button variant="secondary" size="sm" className="h-8">
								<Rocket className="w-4 h-4 mr-2" />
								Deploy
							</Button>
						</div>
					</header>

					{/* Main Content Area */}
					<main className="flex-1 w-full max-w-full p-6 overflow-auto">{children}</main>
				</SidebarInset>
			</div>

			<CommandDialog open={isCommandPaletteOpen} onOpenChange={setIsCommandPaletteOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>
							<FileText className="w-4 h-4 mr-2" />
							<span>Create new content</span>
						</CommandItem>
						<CommandItem>
							<Rocket className="w-4 h-4 mr-2" />
							<span>Deploy site</span>
						</CommandItem>
						<CommandItem>
							<Settings className="w-4 h-4 mr-2" />
							<span>Open settings</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="Settings">
						<CommandItem>
							<User className="w-4 h-4 mr-2" />
							<span>Profile</span>
							<CommandShortcut>⌘P</CommandShortcut>
						</CommandItem>
						<CommandItem>
							<Settings className="w-4 h-4 mr-2" />
							<span>Settings</span>
							<CommandShortcut>⌘S</CommandShortcut>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</SidebarProvider>
	);
}