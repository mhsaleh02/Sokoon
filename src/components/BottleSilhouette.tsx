const BottleSilhouette = () => {
  return (
    <div className="bottle-container flex items-center justify-center">
      <img src="bottle.png" alt="Bottle Silhouette" className="object-cover max-h-[300px]" />
      <div className="bottle-container-overlay"></div>
    </div>
  )
};

export default BottleSilhouette;
