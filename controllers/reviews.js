const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.newReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let review = new Review(req.body);
  review.author = req.user._id;
  review.save();
  listing.reviews.push(review);
  listing.save();
  req.flash("success", "New review created !");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { reviewId, id } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review successfully deleted !");
  res.redirect(`/listings/${id}`);
};
