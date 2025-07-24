<?php

namespace App\Repositories\Interfaces\Tenancy;

use Stancl\Tenancy\Database\Models\Domain;

interface DomainInterface
{
    /**
     * Retrieve a domain by its ID.
     */
    public function get(int $id): ?Domain;

    /**
     * Store a new domain.
     */
    public function store($request): Domain;

    /**
     * Update an existing domain.
     */
    public function update(Domain $domain, $request): bool;

    /**
     * Delete a domain.
     */
    public function delete(Domain $domain): bool;

    /**
     * Get paginated list of domains.
     */
    public function paginate(int $perPage = 10);

    public function baseData();
}
