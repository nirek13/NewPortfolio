export interface Photo {
  id: string;
  filename: string;
  width: number;
  height: number;
  caption: string;
}

// Display order: mixed aspect ratios interleave, the widest shot closes the grid.
export const photos: Photo[] = [
  { id: "pic1", filename: "pic1.png", width: 1530, height: 1018, caption: "Downtown Vancouver." },
  { id: "pic2", filename: "pic2.png", width: 1526, height: 1014, caption: "Downtown Vancouver, Tiffany store." },
  { id: "pic4", filename: "pic4.png", width: 1416, height: 1016, caption: "Vancouver skytrain." },
  { id: "pic5", filename: "pic5.png", width: 1534, height: 1018, caption: "Toronto Museum." },
  { id: "pic6", filename: "pic6.png", width: 1532, height: 1018, caption: "Yonge-Dundas Square in Toronto." },
  { id: "pic7", filename: "pic7.png", width: 1242, height: 1016, caption: "Burnaby, BC, Canada." },
  { id: "pic8", filename: "pic8.png", width: 1530, height: 1022, caption: "Langley, BC, Canada." },
  { id: "pic9", filename: "pic9.png", width: 1526, height: 1014, caption: "Seawall, Vancouver." },
  { id: "pic10", filename: "pic10.png", width: 706, height: 1018, caption: "Downtown Vancouver." },
  { id: "pic11", filename: "pic11.png", width: 672, height: 1014, caption: "Downtown Vancouver." },
  { id: "pic3", filename: "pic3.png", width: 2074, height: 1020, caption: "Downtown Vancouver." },
];

export function getPhoto(id: string): Photo | undefined {
  return photos.find((photo) => photo.id === id);
}

export function getAdjacentPhotos(id: string): {
  prev: Photo | null;
  next: Photo | null;
} {
  const index = photos.findIndex((photo) => photo.id === id);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? photos[index - 1] : null,
    next: index < photos.length - 1 ? photos[index + 1] : null,
  };
}
