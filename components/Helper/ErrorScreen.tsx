export default function ErrorScreen({errorStatus}: {errorStatus: number}) {
  const errorMessage = errorStatus === 429 ? "Too many requests are being processed right now. Please try again later." : "An internal server error has occured. Please try again later.";
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cover bg-center" style = {{
      backgroundImage: `url('/loadingScreenBG.jpg')`
    }}>
      <p className="general-text text-[10vw]"> {errorStatus} </p>
      <p className="general-text text-[4vw]"> {errorMessage} </p>
    </div>
  );
}