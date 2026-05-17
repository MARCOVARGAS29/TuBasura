class Report {
  #id;
  #userId;
  #userName;
  #scheduleId;
  #district;
  #description;
  #image;
  #likeCount;
  #createdAt;
  #updatedAt;

  constructor({
    description,
    image,
    id = null,
    userId = null,
    userName = null,
    scheduleId = null,
    district = null,
    createdAt = null,
  } = {}) {
    if (!userId || userId.trim() === '') {
      this.#userId = null;
    } else {
      this.#userId = userId;
    }

    if (!scheduleId || scheduleId.trim() === '') {
      this.#scheduleId = null;
    } else {
      this.#scheduleId = scheduleId;
    }

    if (!description || description.trim() === '') {
      throw new Error('Description required');
    }

    this.#id = id || this.#generateUUID();
    this.#userName = userName || null;
    this.#district = district || null;
    this.#description = description;
    this.#image = image || null;
    this.#likeCount = 0;
    this.#createdAt = createdAt ? new Date(createdAt) : new Date();
    this.#updatedAt = null;
  }

  // Properties for backward compatibility with tests
  get id() {
    return this.#id;
  }

  get description() {
    return this.#description;
  }

  get image() {
    return this.#image;
  }

  get userName() {
    return this.#userName;
  }

  get district() {
    return this.#district;
  }

  get createdAt() {
    return this.#createdAt;
  }

  get likes() {
    return this.#likeCount;
  }

  // Accessor methods
  getId() {
    return this.#id;
  }

  getUserId() {
    return this.#userId;
  }

  getScheduleId() {
    return this.#scheduleId;
  }

  getUserName() {
    return this.#userName;
  }

  getDistrict() {
    return this.#district;
  }

  getDescription() {
    return this.#description;
  }

  getLikeCount() {
    return this.#likeCount;
  }

  getCreatedAt() {
    return this.#createdAt;
  }

  getUpdatedAt() {
    return this.#updatedAt;
  }

  // Mutation methods
  like() {
    this.#likeCount += 1;
    this.#updatedAt = new Date();
    return this.#likeCount;
  }

  unlike() {
    this.#likeCount = Math.max(0, this.#likeCount - 1);
    this.#updatedAt = new Date();
    return this.#likeCount;
  }

  isOwnedBy(userId) {
    return this.#userId === userId;
  }

  toJSON() {
    return {
      id: this.#id,
      userId: this.#userId,
      userName: this.#userName,
      scheduleId: this.#scheduleId,
      district: this.#district,
      description: this.#description,
      image: this.#image,
      likes: this.#likeCount,
      likeCount: this.#likeCount,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }

  #generateUUID() {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Factory functions for backward compatibility
function createReport({
  description,
  image,
  id = Date.now().toString(),
  userId,
  userName,
  scheduleId,
  district,
  createdAt,
}) {
  const report = new Report({
    description,
    image,
    id,
    userId,
    userName,
    scheduleId,
    district,
    createdAt,
  });
  // Return object-like interface for backward compatibility
  return {
    id: report.id,
    userId: report.getUserId(),
    userName: report.userName,
    scheduleId: report.getScheduleId(),
    district: report.district,
    description: report.description,
    image: report.image,
    likes: report.likes,
    createdAt: report.createdAt,
  };
}

function incrementReportLikes(report) {
  return {
    ...report,
    likes: report.likes + 1,
  };
}

export { createReport, incrementReportLikes };
export default Report;
