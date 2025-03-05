export default {
  beforeMount(el, binding) {
    if (binding.value) {
      document.body.style.overflow = "hidden";
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = "auto";
  },
};
