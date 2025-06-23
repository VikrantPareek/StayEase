const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let listings = await Listing.find({});
  res.render("listings/listings.ejs", { listings });
};

module.exports.new = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.create = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body);
  newListing.owner = req.user.id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New listing created !");
  res.redirect("/listings");
};

module.exports.show = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist !");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.edit = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist !");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

module.exports.update = async (req, res) => {
  let listing = await Listing.findByIdAndUpdate(req.params.id, req.body);
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing successfully updated !");
  res.redirect(`/listings/${req.params.id}`);
};

module.exports.delete = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing successfully deleted !");
  res.redirect("/listings");
};
