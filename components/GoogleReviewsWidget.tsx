import { Star, ExternalLink } from "lucide-react";

export default function GoogleReviewsWidget() {
  const reviews = [
    { id: 1, author: "Firoz Ozman", text: "EazyFly Travels made our whole trip stress-free from start to finish. We booked multiple flight tickets through them, and everything was handled smoothly, quickly, and with great attention to detail.", rating: 5, initial: "F" },
    { id: 2, author: "Abdulla Mohammed", text: "I have been booking my flight tickets through Mr. Mohammed Anas for the last 2 years, and the service has always been excellent. He is very professional, supportive, and always helps me get flight tickets at a cheaper price.", rating: 5, initial: "A" },
    { id: 3, author: "Shaheer Ahamad", text: "I approached EazyFly Travels Kasaragod for visa assistance and I'm satisfied with the service. They checked all documents carefully and guided me step by step.", rating: 5, initial: "S" }
  ];

  return (
    <div className="bg-white rounded-[var(--radius-card)] p-8 shadow-[var(--card-shadow)] border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Google Reviews</h3>
          <div className="flex items-center gap-3">
            <div className="flex text-yellow-400" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-gray-800">5.0</span>
            <span className="text-gray-500 text-sm">(17 reviews)</span>
          </div>
        </div>
        <a 
          href="https://google.com/search?q=eazyfly+travels+reviews" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-colors"
        >
          View all on Google <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[var(--primary-blue)] text-white flex items-center justify-center font-bold">
                {review.initial}
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{review.author}</div>
                <div className="flex text-yellow-400 mt-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">
              "{review.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}