<?php

namespace App\Repositories\Interfaces\Purchase;

use App\Models\Purchase;

interface PurchaseInterface
{
/**
     * Retrieve a purchase by its ID.
     */
    public function get(int $id): ?Purchase;

    /**
     * Store a new purchase.
     */
    public function store($request): Purchase;

    /**
     * Update an existing purchase.
     */
    public function update(Purchase $purchase, $request): bool;

    /**
     * Delete a purchase.
     */
    public function delete(Purchase $purchase): bool;



}
