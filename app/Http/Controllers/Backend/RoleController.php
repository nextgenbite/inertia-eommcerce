<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    public function AllPermission()
    {

        $permissions = Permission::all();
        return view('backend.pages.permission.all_permission', compact('permissions'));
    } // End Method


    public function AddPermission()
    {

        return view('backend.pages.permission.add_permission');
    } // End Method


    public function StorePermission(Request $request)
    {

        $role = Permission::create([
            'name' => $request->name,
            'group_name' => $request->group_name,

        ]);

        $notification = array(
            'message' => 'Permission Added Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.permission')->with($notification);
    } // End Method


    public function EditPermission($id)
    {

        $permission = Permission::findOrFail($id);
        return view('backend.pages.permission.edit_permission', compact('permission'));
    } // End Method


    public function UpdatePermission(Request $request)
    {

        $per_id = $request->id;

        Permission::findOrFail($per_id)->update([
            'name' => $request->name,
            'group_name' => $request->group_name,

        ]);

        $notification = array(
            'message' => 'Permission Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.permission')->with($notification);
    } // End Method


    public function DeletePermission($id)
    {

        Permission::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Permission Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method
    ////////////////////// Roles All Method ///////////


    public function AllRoles()
    {

        $roles = Role::all();
        return view('backend.roles.all_roles', compact('roles'));
    } // End Method


    public function AddRoles()
    {

        $roles = Role::all();
        $permissions = Permission::all();
        $permission_groups = User::getpermissionGroups();
        return view('backend.roles.add_roles', compact('roles', 'permissions', 'permission_groups'));
    } // End Method


    public function StoreRoles(Request $request)
    {

        $role = Role::create([
            'name' => $request->name,

        ]);

        $data = array();
        $permissions = $request->permission;
        if ($permissions) {
            foreach ($permissions as $key => $item) {
                $data['role_id'] = $role->id;
                $data['permission_id'] = $item;

                DB::table('role_has_permissions')->insert($data);
            }
        }

        $notification = array(
            'message' => 'Role Added Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.roles')->with($notification);
    } // End Method


    public function EditRoles($id)
    {

        $role = Role::findOrFail($id);
        $permissions = Permission::all();
        $permission_groups = User::getpermissionGroups();
        return view('backend.roles.edit_roles', compact('role', 'permissions', 'permission_groups'));
    } // End Method

    public function UpdateRoles(Request $request)
    {

        $role_id = $request->id;
        $role = Role::findOrFail($role_id);

        // Update the role attributes
        $role->update([
            'name' => $request->name,
        ]);

        $permissions = $request->permission;

        if (!empty($permissions)) {
            // Sync permissions if there are any
            $role->syncPermissions($permissions);
        }


        $notification = array(
            'message' => 'Role Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.roles')->with($notification);
    } // End Method


    public function DeleteRoles($id)
    {

        Role::findOrFail($id)->delete();

        $notification = array(
            'message' => 'Role Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method


    //////////////// Add Roles Permission All Method ////////////


    public function AddRolesPermission()
    {

        $roles = Role::all();
        $permissions = Permission::all();
        $permission_groups = User::getpermissionGroups();
        return view('backend.roles.add_roles_permission', compact('roles', 'permissions', 'permission_groups'));
    } // End Method


    public function StoreRolesPermission(Request $request)
    {

        $data = array();
        $permissions = $request->permission;

        foreach ($permissions as $key => $item) {
            $data['role_id'] = $request->role_id;
            $data['permission_id'] = $item;

            DB::table('role_has_permissions')->insert($data);
        }

        $notification = array(
            'message' => 'Role Permission Added Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.roles.permission')->with($notification);
    } // End Method


    public function AllRolesPermission()
    {

        $roles = Role::all();
        return view('backend.roles.all_roles_permission', compact('roles'));
    } // End Method


    public function AdminEditRoles($id)
    {

        $role = Role::findOrFail($id);
        $permissions = Permission::all();
        $permission_groups = User::getpermissionGroups();
        return view('backend.roles.edit_roles_permission', compact('role', 'permissions', 'permission_groups'));
    } // End Method


    public function RolePermissionUpdate(Request $request, $id)
    {

        $role = Role::findOrFail($id);
        $permissions = $request->permission;

        if (!empty($permissions)) {
            $role->syncPermissions($permissions);
        }

        $notification = array(
            'message' => 'Role Permission Updated Successfully',
            'alert-type' => 'success'
        );

        return redirect()->route('all.roles.permission')->with($notification);
    } // End Method


    public function AdminDeleteRoles($id)
    {

        $role = Role::findOrFail($id);
        if (!is_null($role)) {
            $role->delete();
        }

        $notification = array(
            'message' => 'Role Permission Deleted Successfully',
            'alert-type' => 'success'
        );

        return redirect()->back()->with($notification);
    } // End Method




}
