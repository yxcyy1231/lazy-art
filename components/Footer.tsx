export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#8B1E2D] text-white py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold">Lazy Art 懶得畫室</h3>
          <p className="mt-1 text-white/60 text-xs">© {year} Lazy Art.</p>
        </div>

        <div className="text-center text-xs leading-6 text-white md:text-right md:text-sm">
          <p>地址：台北市中山區龍江路209巷17號2樓</p>
          <p>Email：<a href="mailto:lazyartus@gmail.com" className="hover:underline">lazyartus@gmail.com</a></p>
          <p>Instagram：<a href="https://www.instagram.com/lazyart_us" target="_blank" rel="noopener noreferrer" className="hover:underline">@lazyart_us</a></p>
        </div>

      </div>
    </footer>
  );
}
