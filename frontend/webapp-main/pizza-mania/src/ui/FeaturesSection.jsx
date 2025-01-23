const FeaturesSection = () => {
  const features = [
    {
      icon: '🍔',
      title: 'Super Quality Food',
      description:
        'A team of dreamers and doers building unique interactive music and art',
    },
    {
      icon: '🥘',
      title: 'ORIGINAL RECIPES',
      description:
        'A team of dreamers and doers building unique interactive music and art',
    },
    {
      icon: '🛵',
      title: 'QUICK FAST DELIVERY',
      description:
        'A team of dreamers and doers building unique interactive music and art',
    },
    {
      icon: '✨',
      title: '100% FRESH FOODS',
      description:
        'A team of dreamers and doers building unique interactive music and art',
    },
  ];

  return (
    <div className="bg-red-500 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="mb-4 text-4xl text-yellow-400">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-bold text-white">{feature.title}</h3>
              <p className="text-sm text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
