import React, { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {
  componentDidMount() {
    const { options, startDirectly, stopDirectly } = this.props;
    const { map } = this.props.leaflet;

    const lc = new Locate(options);
    lc.addTo(map);

    if (startDirectly) {
      // request location update and set location
      lc.start();
      
    }else if (stopDirectly) {
      lc.stopFollowing()
    }
    console.log(lc)
  }

  render() {
    return null;
  }
}

export default withLeaflet(LocateControl);
