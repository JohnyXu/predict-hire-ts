export interface VacancyEntity {
  id: string;
  title: string;
  description: string;
  expiredAt: string;
  userId: string;
  companyId: string;
}

export interface VacancyInputEntity {
  title?: string;
  description?: string;
  expiredAt?: string;
}

export interface VacancyUpdateError {
  id?: string;
  message?: string;
}
