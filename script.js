const galleryButtons = [...document.querySelectorAll(".photo-card")];
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const caption = document.querySelector(".lightbox-caption");
const count = document.querySelector(".lightbox-count");
const closeButton = document.querySelector(".lightbox-close");
let activeIndex = 0;
let returnFocusTo = null;

function showPhoto(index) {
  activeIndex = (index + galleryButtons.length) % galleryButtons.length;
  const photo = galleryButtons[activeIndex];
  lightboxImage.src = photo.dataset.photo;
  lightboxImage.alt = photo.dataset.alt;
  caption.textContent = photo.dataset.caption;
  count.textContent = `${String(activeIndex + 1).padStart(2, "0")} / ${String(galleryButtons.length).padStart(2, "0")}`;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    returnFocusTo = button;
    showPhoto(index);
    lightbox.showModal();
    closeButton.focus();
  });
});

document.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activeIndex - 1));
document.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activeIndex + 1));
closeButton.addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) lightbox.close();
});
lightbox.addEventListener("close", () => {
  lightboxImage.removeAttribute("src");
  returnFocusTo?.focus();
});
lightbox.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showPhoto(activeIndex - 1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showPhoto(activeIndex + 1);
  }
});
