'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { createReview } from '../_lib/actions';
import SubmitButton from './SubmitButton';

function ReviewForm({ cabinId, cabinName, bookingId, onClose }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  return (
    <div className="bg-[#1E2831] p-6 rounded-lg">
      <h3 className="text-2xl font-semibold mb-4">
        Leave a Review for {cabinName}
      </h3>

      <form
        action={async (formData) => {
          await createReview(formData);
          if (onClose) onClose();
        }}
        className="space-y-4"
      >
        <input type="hidden" name="cabinId" value={cabinId} />
        <input type="hidden" name="bookingId" value={bookingId} />
        <input type="hidden" name="rating" value={rating} />

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Rating <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                {star <= (hoveredRating || rating) ? (
                  <StarIcon className="h-8 w-8 text-yellow-500" />
                ) : (
                  <StarOutline className="h-8 w-8 text-[#4C6B8A]" />
                )}
              </button>
            ))}
            <span className="ml-3 text-lg font-medium">
              {rating > 0 && `${rating} / 5`}
            </span>
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Title <span className="text-sm text-[#99B0C7]">(optional)</span>
          </label>
          <input
            name="title"
            id="title"
            placeholder="Summarize your experience..."
            maxLength={100}
            className="w-full px-4 py-3 bg-[#141C24] border border-[#2C3D4F] rounded-lg focus:outline-none focus:border-[#C69963] text-[#D4DEE7]"
          />
        </div>

        {/* Review Comment */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-2">
            Your Review <span className="text-red-500">*</span>
          </label>
          <textarea
            name="comment"
            id="comment"
            required
            minLength={10}
            maxLength={1000}
            rows={5}
            placeholder="Tell us about your stay... (minimum 10 characters)"
            className="w-full px-4 py-3 bg-[#141C24] border border-[#2C3D4F] rounded-lg focus:outline-none focus:border-[#C69963] text-[#D4DEE7] resize-none"
          />
          <p className="text-sm text-[#99B0C7] mt-1">
            Your review will be reviewed by our team before being published.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-4 justify-end">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-[#2C3D4F] text-[#D4DEE7] rounded-lg hover:bg-[#3A4D61] transition-colors"
            >
              Cancel
            </button>
          )}
          <SubmitButton pendingLabel="Submitting...">
            Submit Review
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
