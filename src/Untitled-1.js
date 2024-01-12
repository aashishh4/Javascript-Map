// ... your imports

function Map1() {
  const [load, setLoad] = useState(false)
  const { isLoaded } = useJsApiLoader({ id: "ram", googleMapsApiKey: "YOUR_API_KEY" });

  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const inf1 = useRef();
  const inf2 = useRef();

  useEffect(() => {
    setLoad(true)
  },[])

  const change = () => {
    const startLocation = inf1.current.value;
    const endLocation = inf2.current.value;

    // Your directions code

  };

  const clear = () => {
    setEnd(null);
    setStart(null);
    inf1.current.value = "";
    inf2.current.value = "";
  };

  const onloadcallback = useCallback((loadmap) => {
    if (!start) {
      setStart(loadmap);
    }
  }, [start]);

  return (
    <>
      {isLoaded ? (
        <div>
          <label>Start</label>
          <Autocomplete
            apiKey="YOUR_API_KEY"
            onPlaceSelected={(place) => {
              setStart(place.formatted_address);
            }}
            ref={inf1}
          />
          <Autocomplete
            apiKey="YOUR_API_KEY"
            onPlaceSelected={(place) => {
              setEnd(place.formatted_address);
            }}
            ref={inf2}
          />
          <button onClick={change}>Search</button><br />
          <button onClick={clear}>Clear</button>

          {/* Your GoogleMap component here */}
        </div>
      ) : 
      <div>loading......</div>}
    </>
  );
}

export default Map1;
