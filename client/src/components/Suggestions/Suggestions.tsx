import "./suggestions.scss";
import { BookingContext } from "../../context/bookingContext";
import { useContext, useEffect, useState } from "react";
import { OpenStreetMapProvider } from "leaflet-geosearch";

function Suggestions() {
  const provider = new OpenStreetMapProvider();
  const { bookingDetails } = useContext(BookingContext);
  const [data, setData] = useState<string[]>([]);
  useEffect(() => {
    const location = async () => {
      const response = await provider.search({ query: bookingDetails.origin });
      console.log(response);
      let temp: string[] = response.map((item) => item.label);
      setData(temp);
    };
    location();
  }, []);
  return (
    <div className="suggestion">
      {data.map((item, index) => {
        return (
          <p className="item" key={index}>
            {item}
          </p>
        );
      })}
    </div>
  );
}

export default Suggestions;
