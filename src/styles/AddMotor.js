const style = {
  boxGrid: {
    gridTemplateColumns: "repeat(12, 1fr)",

    // p:3,
  },
  imageTypography: {
    mx: {
      xs: 1,
      lg: 4,
    },
    fontSize: 14,
    my: 2,
  },

  removeButton: {
    fontSize: 20,
    position: "absolute",
    right: 8,
    top: 5,
    cursor: "pointer",
    borderRadius: "50%",
    opacity: 0.8,
    backgroundColor: "black",
    color: "white",
  },
  uploadBg: {
    borderRadius: 2,
    p: 2,
    border: "1px dashed gray",
    backgroundColor: "#E5E5E5",
    ":hover": {
      backgroundColor: "transparent",
    },
    cursor: "pointer",
  },
  thumbsContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    mt: 20,
  },
  thumbPreview: {
    display: "inline-flex",
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: "border-box",
  },

  thumbInner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
  },

  img: {
    display: "block",
    width: "auto",
    height: "100%",
  },

  imgEmpty: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "100%",
    height: 150,
  },
};
export default style;
