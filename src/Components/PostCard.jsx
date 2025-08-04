
export default function PostCard({title , body , image ,date}) {
  return (
    <div>
       <div className="grid grid-cols-9 bg-storm-800 rounded-3xl overflow-hidden shadow-xl shadow-storm-700/50">
          <div className="col-span-9 md:col-span-3 card-rounded-custom">
            <img src={image} alt={title} className="w-full object-cover" />
          </div>
          <div className="col-span-9 md:col-span-6 px-4 py-6 flex flex-col gap-3">
            <h3 className="text-xl text-storm-500">{title}</h3>
            <p className="text-storm-600">{body}</p>
            <p className="text-xs text-storm-700">{date}</p>
            <div className="mt-auto flex justify-around">
                <button className="text-storm-500 text-xs md:text-sm md:px-4 px-3 py-2 bg-storm-900 rounded hover:bg-storm-900/70">Edit</button>
                <button className="text-storm-500 text-xs  md:text-sm md:px-4 px-3 py-2 bg-red-900 rounded hover:bg-red-800">Delete</button>
            </div>
          </div>
        </div> 
    </div>
  )
}
