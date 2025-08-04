import { PostCard } from "../Components";

export default function Home() {
  return (
    <main className="container mx-auto p-5">
        <h2 className="m-5 text-2xl font-semibold text-storm-500">All Shared Posts</h2>
        <div className="container mx-auto flex justify-center flex-wrap">
            <div className="flex-[1_0_50%] lg:flex-[0_0_33%]">
                <div className="p-2">
                    <PostCard image="https://i.pinimg.com/1200x/47/d6/4e/47d64ef869b4c93370b9c506207e7f4a.jpg" body="hellosdsdddddddddddddddd" title="goood" date="3-10-2000"/>
                </div>
            </div>
             <div className="flex-[1_0_50%] lg:flex-[0_0_33%]">
                <div className="p-2">
                    <PostCard image="https://i.pinimg.com/1200x/47/d6/4e/47d64ef869b4c93370b9c506207e7f4a.jpg" body="hellosdsdddddddddddddddd" title="goood" date="3-10-2000"/>
                </div>
            </div>
             <div className="flex-[1_0_50%] lg:flex-[0_0_33%]">
                <div className="p-2">
                    <PostCard image="https://i.pinimg.com/1200x/47/d6/4e/47d64ef869b4c93370b9c506207e7f4a.jpg" body="hellosdsdddddddddddddddd" title="goood" date="3-10-2000"/>
                </div>
            </div>
        </div>
    </main>
  )
}
