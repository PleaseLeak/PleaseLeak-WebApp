import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import Home from "./pages/Home/Home";
import AppContextProvider from "./context/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import Footer from "./components/Navigation/Footer";
import Models from "./pages/Models/Models";
import { UserContextProvider } from "./context/userContext";
import SignIn from "./pages/Private/SignIn";
import SignUp from "./pages/Private/SignUp";
import Profile from "./pages/Private/User/Profile";
import Private from "./pages/Private/Private";
import Settings from "./pages/Settings/Settings";
import Favorites from "./pages/Private/User/Favorites";
// import AssPictures from "./pages/PicturesPages/AssPictures";
// import PussyPictures from "./pages/PicturesPages/PussyPictures";
// import BoobsPictures from "./pages/PicturesPages/BoobsPictures";
import Help from "./pages/Help/Help";
import Carroussel from "./pages/Carroussel/Carroussel";
// import Videos from "./pages/Videos/Videos";
import ResetPassword from "./pages/Help/ResetPassword";
import ResetConfirmed from "./pages/Help/ResetConfirmed";
import SuccessRequest from "./pages/Help/SuccessRequest";
import GeneratePage from "./pages/ai/GeneratePage";
import PicturesSaved from "./pages/ai/PicturesSaved";
// import Test from "./pages/Test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      cacheTime: 1000 * 60 * 60 * 24,
    },
  },
});

document.getElementById("website-loader").style.display = "none";
document.body.style.display = "block";
const baseUrl = import.meta.env.BASE_URL;
console.log(baseUrl);
function App() {
  return (
    <>
      <ChakraProvider>
        <BrowserRouter basename={baseUrl}>
          <QueryClientProvider client={queryClient}>
            <UserContextProvider>
              <AppContextProvider>
                <NavBar />
                <Routes>
                  <Route path="/*" element={<Home />} />
                  <Route path="/models/:search" element={<Models />} />
                  <Route path="/models" element={<Models />} />
                  {/* <Route path="/test" element={<Test />} /> */}*
                  <Route path="/ai" element={<GeneratePage />} />
                  <Route path="/ai/saved" element={<PicturesSaved />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/settings" element={<Settings />} />
                  {/* <Route path="/ass-pictures" element={<AssPictures />} /> */}
                  {/* <Route path="/pussy-pictures" element={<PussyPictures />} />
                  <Route path="/boobs-pictures" element={<BoobsPictures />} /> */}
                  {/* <Route path="/videos" element={<Videos />} /> */}
                  <Route path="/gallery/" element={<Carroussel />} />
                  <Route path="/help/:request" element={<Help />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/reset-confirmed" element={<ResetConfirmed />} />
                  <Route path="/request-success" element={<SuccessRequest />} />
                  <Route path="/private" element={<Private />}>
                    <Route path="/private/profile" element={<Profile />} />
                    <Route path="/private/favorites" element={<Favorites />} />
                  </Route>
                </Routes>
                <Footer />
              </AppContextProvider>
            </UserContextProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
