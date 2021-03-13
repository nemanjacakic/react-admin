<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $adminPermissions = [
            'view users', 'create users', 'edit users', 'delete users'
        ];

        $editorPermissions = [ 'view users' ];

        $subscriberPermissions = [];

        array_map((function ($perrmision) {
            Permission::create(['name' => $perrmision]);
        }), $adminPermissions);

        $admin = Role::create(['name' => 'Admin']);
        $editor = Role::create(['name' => 'Editor']);
        $subscriber = Role::create(['name' => 'Subscriber']);

        $admin->givePermissionTo($adminPermissions);

        $editor->givePermissionTo($editorPermissions);

        $subscriber->givePermissionTo($subscriberPermissions);

        User::factory()->create([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@example.com'
        ])->assignRole('Admin');

        User::factory()->count(30)->create()->each(function ($user) {
            $user->assignRole('Editor');
        });
    }
}
