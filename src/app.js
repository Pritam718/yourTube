import React from "react";
import Axios from "axios";

const App = () => {
  const [search, setSearch] = React.useState("ISRO");
  const [videos, setVideos] = React.useState([]);
  const [playvideoid, setPlayvideoid] = React.useState("");
  const [titel, setTitel] = React.useState("");
  const handelChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };
  React.useEffect(() => {
    Axios.get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 10,
        key: "AIzaSyAo3giS5-xA-0HEVXMe5RQziTFB8AnIo9I",
        q: search,
      },
    }).then((result) => {
      console.log(result.data.items);
      setVideos(result.data.items);
      setPlayvideoid(
        result?.data?.items[0]?.videoId
          ? result.data.items[0].id.videoId
          : result.data.items[1].id.videoId
      );
      setTitel(
        result?.data?.items[0]?.videoId
          ? result.data.items[0].snippet.title
          : result.data.items[1].snippet.title
      );
    });
  }, [search]);
  const handelClick = (id, data) => {
    setPlayvideoid(id);
    setTitel(data.snippet.title);
    document.documentElement.scrollTop = 0;
  };
  const listdata = videos.map((data) => {
    console.log(data);
    return (
      <li
        className="list-group-item p-1 m-1"
        onClick={() => {
          handelClick(data.id.videoId, data);
        }}
      >
        <img
          className="img-fulid"
          width="100%"
          src={data.snippet.thumbnails.high.url}
        ></img>
        <p>{data.snippet.title}</p>
      </li>
    );
  });
  return (
    <div className="container mt-3">
      <h3>Your Tube</h3>
      <input
        className="form-control shadow-lg"
        value={search}
        onChange={handelChange}
      ></input>
      <div className="row mt-3">
        <div className="col-lg-8">
          <div className="card ">
            <div className="card-body p-1">
              <iframe
                width="100%"
                height="500"
                src={`https://www.youtube.com/embed/${playvideoid}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="true"
              ></iframe>
            </div>
          </div>
          <div className="card my-3">
            <div className="card-body">
              <h3>{titel}</h3>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <ul className="list-group p-0 m-0">{listdata}</ul>
        </div>
      </div>
    </div>
  );
};
export default App;
