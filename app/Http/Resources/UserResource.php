<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'bio' => $this->bio,
            'email' => $this->email,
            'avatar' => $this->avatar,
            'role' => new RoleResource($this->roles()->first()),
            'permissions' => $this->getAllPermissions()->pluck('name')->toArray()
        ];
    }
}
