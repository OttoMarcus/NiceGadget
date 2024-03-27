"use client";
import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import styles from "./MapContent.module.scss";
import PropTypes from "prop-types";

const MapContent = ({ activeTab }) => {
  const [info, setInfo] = useState(false);
  const position = (activeTab) => {
    switch (activeTab) {
      case "kyiv":
        return { lat: 50.450702369063926, lng: 30.523146950852503 };
      case "lviv":
        return { lat: 49.8386205833624, lng: 24.03400493901791 };
      case "kharkiv":
        return { lat: 49.99193802948051, lng: 36.23430932553278 };
      default:
        return { lat: 50.4501, lng: 30.5234 };
    }
  };

  return (
    <APIProvider apiKey={"AIzaSyC7ULlf1GEIxZBvF-jmUAyK5XtoJPiNQZM"}>
      <Map
        center={position(activeTab)}
        className={styles.mapContainer}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={"54a738337e73d795"}
      >
        <AdvancedMarker
          position={position(activeTab)}
          onClick={() => setInfo(true)}
        >
          <Pin
            background={"purple"}
            borderColor={"green"}
            glyphColor={"white"}
          />
        </AdvancedMarker>
        {info && (
          <InfoWindow
            position={position(activeTab)}
            onCloseClick={() => setInfo(false)}
          >
            <b style={{ color: "rebeccapurple" }}>
              Hello, I am NiceGadgets Shop. The Best phones are only here!
            </b>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

MapContent.propTypes = {
  activeTab: PropTypes.string,
};
export default MapContent;
