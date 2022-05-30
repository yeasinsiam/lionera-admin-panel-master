export const getGalleryFormat = (gallery) => {
  return gallery.reduce((carry, item) => {
    carry = [
      ...carry,
      {
        ...item,
        uid: item._id,
      },
    ];

    return carry;
  }, []);
};
