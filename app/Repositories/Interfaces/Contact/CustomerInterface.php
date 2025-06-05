<?php

namespace App\Repositories\Interfaces\Contact;


use App\Models\Customer;

interface CustomerInterface
{
/**
     * Retrieve a customer by its ID.
     */
    public function get(int $id): ?Customer;

    /**
     * Store a new customer.
     */
    public function store($request): Customer;

    /**
     * Update an existing customer.
     */
    public function update(Customer $customer, $request): bool;

    /**
     * Delete a customer.
     */
    public function delete(Customer $customer): bool;

    

}
