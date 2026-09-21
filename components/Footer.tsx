export default function Footer() {
  return (
    <footer className="bg-[#8B1E2D] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

        {/* 左邊 */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold">Lazy Art 懶得畫室</h3>

          <p className="mt-2 text-white/60 text-sm">
            © {new Date().getFullYear()} Lazy Art.
          </p>
        </div>

        {/* 右邊：聯絡資訊 */}
        <div className="text-center text-sm leading-7 text-white md:text-right md:text-base">
          <p>地址：台北市中山區龍江路209巷17號2樓</p>

          <p>
            Email：
            <a href="mailto:lazyartus@gmail.com" className="hover:underline">
              lazyartus@gmail.com
            </a>
          </p>

          <p>
            Instagram：
            
              href="https://www.instagram.com/lazyart_us"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @lazyart_us
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
}
