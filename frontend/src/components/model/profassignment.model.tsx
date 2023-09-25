export interface Assignment {
    assignmentTitle?: string;
    visibleDate?: string;
    submissionDate?: string;
    description?: string;
    file?: File | null;
    grade?: number;
    courseId: string | null;
    _id?: string | null;
  }