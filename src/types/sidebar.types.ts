export interface MenuItem {
    label: string;
    icon: string;
    path: string;
}

export interface SidebarProps {
    menuItems: MenuItem[];
    logoSrc?: string;
    logoAlt?: string;
    isMobileMenuOpen?: boolean;
    onMobileMenuClose?: () => void;
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
    isDarkMode?: boolean;
}
