<?php

namespace App\Repositories\Interfaces\Expense;

use App\Models\Expense;

interface ExpenseInterface
{
/**
     * Retrieve a expense by its ID.
     */
    public function show(int $id): ?Expense;

    /**
     * Store a new expense.
     */
    public function store($request): Expense;

    /**
     * Update an existing expense.
     */
    public function update(Expense $expense, $request): bool;

    /**
     * Delete a expense.
     */
    public function delete(Expense $expense): bool;

    
    public function baseData();


}
