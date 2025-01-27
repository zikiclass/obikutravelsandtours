import Header from "@/components/header/page";
import Menu from "@/components/menu/page";
import Search from "@/components/search/page";
import BottomFooter from "@/components/footer_bottom/page";
import Footer from "@/components/footer/page";
import Lists from "@/components/lists/page";

export default function Bus() {
  return (
    <>
      <div
        style={{
          position: "fixed",
          width: "100%",
          backgroundColor: "white",
          top: "0px",
          zIndex: "10000",
        }}
      >
        <Header />
        <Search />
        <Menu active="cruise" />
      </div>
      <Lists searchQuery="Bus Booking" />
      <Footer />
      <BottomFooter />
    </>
  );
}
