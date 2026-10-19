const ProjectArtwork = ({ title, image }) => (
  <img
    className="project-artwork"
    src={image}
    alt={`${title} live project overview`}
    loading="lazy"
    decoding="async"
  />
);

export default ProjectArtwork;
