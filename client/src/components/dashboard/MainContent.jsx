import Details from "./main-content-components/Details"
import ImageComponent from "./main-content-components/ImageComponent"
import InfoComponent from "./main-content-components/InfoComponent"
import Titlebar from "./main-content-components/Titlebar"

const MainContent = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="panel-header panel-title" style={{ width: "100%" }}>
        <Titlebar />
      </div>
      <div className="v-form" style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ width: "100%", height: "30%", display: "flex", flexDirection: "column" }}>
        {/* <div style={{ width: "100%", height: "50%" }}><ImageComponent /></div> */}
          <div style={{ width: "100%", height: "50%" }}><Details /></div>
        </div>
        <div style={{ width: "100%", overflow: "auto", display: "flex", flexDirection: "column", flexGrow: "1" }}>
          <InfoComponent />
        </div>
      </div>

    </div>
  )
}

export default MainContent