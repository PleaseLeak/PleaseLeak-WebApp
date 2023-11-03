import { createContext } from "react";
import { useQuery } from "react-query";
import {
  getGalleryImage,
  // getAllVideos,
  // getAssPictures,
  // getBoobsPictures,
  getModels,
  // getPussyPictures,
} from "../utils/fetchs";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
/* eslint-disable react/prop-types */
export const appContext = createContext();

const AppContextProvider = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("settings")) || {
      picturesQuality: "medium",
      bannerQuality: "medium",
    }
  );

  const ModelsFetched = useQuery({
    queryKey: ["models"],
    queryFn: getModels,
  });

  // const AssPicturesFetched = useQuery({
  //   queryKey: ["ass-pictures"],
  //   queryFn: getAssPictures,
  // });
  // const PussyPicturesFetched = useQuery({
  //   queryKey: ["pussy-pictures"],
  //   queryFn: getPussyPictures,
  // });
  // const BoobsPicturesFetched = useQuery({
  //   queryKey: ["boobs-pictures"],
  //   queryFn: getBoobsPictures,
  // });
  // const VideosFetched = useQuery({
  //   queryKey: ["videos"],
  //   queryFn: getAllVideos,
  // });
  const GalleryFetched = useQuery({
    queryKey: ["ai-gallery"],
    queryFn: getGalleryImage,
  });

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  return (
    <appContext.Provider
      value={{
        ModelsFetched,
        // AssPicturesFetched,
        // PussyPicturesFetched,
        // BoobsPicturesFetched,
        // VideosFetched,
        settings,
        setSettings,
        GalleryFetched,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
