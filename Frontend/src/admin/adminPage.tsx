import { useAuthStore } from "@/stores/useAuthStore";
// import Header from "./components/Header";
// import DashboardStats from "./components/DashboardStats";
import { Album, Music } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongsTabContent from "./components/SongsTabContent";
import AlbumsTabContent from "./components/AlbumTabContent";
import { useEffect } from "react";
import { useMusicStore } from "@/stores/useMusicStore";
import Header from "./components/Header";
import DashboardStats from "./components/DahboardStats"
const AdminPage = () => {
	const {  isLoading } = useAuthStore();

  const isAdmin = true; // Replace with actual admin check from auth store

	const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

	useEffect(() => {
		fetchAlbums();
		fetchSongs();
		fetchStats();
	}, [fetchAlbums, fetchSongs, fetchStats]);

	if (!isAdmin && !isLoading) return <div>Unauthorized</div>;

	return (
		<div
			className='min-h-screen bg-gradient-to-t from-zinc-900 via-zinc-900
   to-green-600 text-zinc-100 p-8'
		>
			<Header />

			<DashboardStats />

			<Tabs defaultValue='songs' className='space-y-6'>
				<TabsList className='p-1 bg-zinc-800/50'>
					<TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700 text-white'>
						<Music className='mr-2 size-4' />
						Songs
					</TabsTrigger>
					<TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700 text-white'>
						<Album className='mr-2 size-4' />
						Albums
					</TabsTrigger>
				</TabsList>

				<TabsContent value='songs'>
					<SongsTabContent />
				</TabsContent>
				<TabsContent value='albums'>
					<AlbumsTabContent />
				</TabsContent>
			</Tabs>
		</div>
	);
};
export default AdminPage;
