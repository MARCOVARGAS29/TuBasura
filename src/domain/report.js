function createReport({ description, image, id = Date.now().toString() }) {
  return {
    id,
    description,
    image,
    likes: 0,
  };
}

function likeReport(report) {
  return {
    ...report,
    likes: report.likes + 1,
  };
}

export { createReport, likeReport };
