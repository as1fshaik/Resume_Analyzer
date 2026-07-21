import { LayoutDashboard, FileUp, FileText, History, User } from 'lucide-react';

export const NAVIGATION_ITEMS = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Upload Resume',
    path: '/upload',
    icon: FileUp,
  },
  {
    title: 'Analysis Results',
    path: '/results',
    icon: FileText,
  },
  {
    title: 'History',
    path: '/history',
    icon: History,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: User,
  },
];
