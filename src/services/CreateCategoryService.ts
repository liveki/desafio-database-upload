import { getRepository } from 'typeorm';

import Category from '../models/Category';

interface Request {
  title: string;
}

class CreateCategoryService {
  public async execute({ title }: Request): Promise<string> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { title },
    });

    if (checkCategoryExists) return checkCategoryExists.id;

    const category = categoriesRepository.create({
      title,
    });

    await categoriesRepository.save(category);

    return category.id;
  }
}

export default CreateCategoryService;
