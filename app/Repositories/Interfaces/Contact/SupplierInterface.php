<?php

namespace App\Repositories\Interfaces\Contact;

use App\Models\Supplier;

interface SupplierInterface
{
/**
     * Retrieve a supplier by its ID.
     */
    public function get(int $id): ?Supplier;

    /**
     * Store a new supplier.
     */
    public function store($request): Supplier;

    /**
     * Update an existing supplier.
     */
    public function update(Supplier $supplier, $request): bool;

    /**
     * Delete a supplier.
     */
    public function delete(Supplier $supplier): bool;



}
