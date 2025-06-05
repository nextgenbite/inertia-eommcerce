<?php

namespace App\Repositories\Interfaces\Expense;

use App\Models\Category;

interface PosInterface
{
/**
     * Retrieve a category by its ID.
     */
    public function get(int $id): ?Category;

    /**
     * Store a new category.
     */
    public function store($request): Category;

    /**
     * Update an existing category.
     */
    public function update(Category $category, $request): bool;

    /**
     * Delete a category.
     */
    public function delete(Category $category): bool;

}
