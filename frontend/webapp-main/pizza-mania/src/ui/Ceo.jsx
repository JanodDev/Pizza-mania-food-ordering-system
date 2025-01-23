export default function Ceo() {
  return (
    <div className="relative bg-pink-50 py-20">
      {/* Decorative Images */}
      <img
        src="/frontend/webapp-main/pizza-mania/public/burger.png"
        alt=""
        className="absolute left-20 top-20 w-24 opacity-30"
      />
      <img
        src="/fry.png"
        alt=""
        className="absolute right-20 top-40 w-20 opacity-30"
      />
      <img
        src="/pizza.png"
        alt=""
        className="absolute bottom-20 right-40 w-24 opacity-30"
      />

      <div className="mx-auto max-w-4xl px-6 text-center">
        {/* Author Info */}
        <h3 className="mb-1 text-2xl font-bold">Piter Bowman</h3>
        <p className="mb-8 text-yellow-500">Business CEO & Co Founder</p>

        {/* Testimonial Text */}
        <blockquote className="mb-10 text-3xl font-bold leading-snug">
          Thank You For Dinner Last Night. It Was Amazing!! I Have Say It is The
          Best Meal I Have Had In Quite Some Time. Will Definitely Be Seeing
          More Eating Next Year.
        </blockquote>

        {/* Rating Stars */}
        {/* <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div> */}

        {/* Profile Images */}
        <div className="flex items-center justify-center gap-4">
          <img
            src="/worker.png"
            alt="Testimonial"
            className="h-12 w-12 rounded-full"
          />
          <div className="h-16 w-16 overflow-hidden rounded-full bg-yellow-400">
            <img
              src="/3.png"
              alt="Main testimonial"
              className="h-full w-full object-cover"
            />
          </div>
          <img
            src="/famer.png"
            alt="Testimonial"
            className="h-12 w-12 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
